<template>
  <div id="app">
    <Menus refresh debug :context="dynamicContextMenu" />
    <Watcher
      v-model="selectionLength"
      property="app.selection.length"
      :interval="200"
    />
    <Panel
      script-path="./host/[appName]"
      @mouseenter="inside = true"
      @mouseleave="inside = false"
      @resize="(val) => (size.width = val.width)"
    >
      <Wrapper>
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in extraFuncs"
            :key="i"
            @clickevt="switchMode(item)"
            ><Icons
              :color="
                item.active ? 'var(--color-selection)' : 'var(--color-default)'
              "
              :name="item.icon"
          /></Button>
        </Grid>
        <!-- If panel is wide, use flexbox -->
        <Button-Group v-else>
          <Button
            width="30px"
            flat
            v-for="(item, i) in extraFuncs"
            :key="i"
            @clickevt="switchMode(item)"
            ><Icons
              :color="
                item.active ? 'var(--color-selection)' : 'var(--color-default)'
              "
              :name="item.icon"
          /></Button>
        </Button-Group>
        <Divider v-if="size.width > 70" />

        <!-- <Anno
          v-if="notMini && this.showAnno"
          style="height: 16px; white-space: nowrap;"
          size="10px"
          :color="
            `var(--color-${this.hasAnno ? 'default' : 'scrollbar-arrow'})`
          "
          >{{ anno }}</Anno
        > -->
        <!-- If panel is thin, become CSS grid so buttons expand in size -->
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in list"
            :key="i"
            :disabled="!canUsePathfinder"
            @clickevt="clickHandler(item, $event)"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Grid>
        <!-- If panel is wide, use flexbox -->
        <Button-Group v-else>
          <Button
            width="30px"
            flat
            v-for="(item, i) in list"
            :key="i"
            @clickevt="clickHandler(item, $event)"
            :disabled="!canUsePathfinder"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Button-Group>
        <Divider v-if="size.width > 70" />
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in extraList"
            :key="i"
            :disabled="true"
            @clickevt="distributeHandler(item, $event)"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
          <div class="centered">
            <Input-Scroll v-model="spacing" flat :min="0" />
          </div>
        </Grid>
        <!-- If panel is wide, use flexbox -->
        <Button-Group v-else>
          <Button
            width="30px"
            flat
            v-for="(item, i) in extraList"
            :key="i"
            @clickevt="distributeHandler(item, $event)"
            :disabled="true"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
          <Input-Scroll v-model="spacing" flat />
        </Button-Group>
      </Wrapper>
    </Panel>
  </div>
</template>

<script>
import { evalScript, copy } from "brutalism";
import spy from "cep-spy";
export default {
  components: {
    Icons: require("./components/Icons.vue").default,
  },
  computed: {
    hasAnno() {
      return this.showAnno && this.currentTool && this.currentTool.length;
    },
    anno() {
      return this.currentTool
        ? this.capitalizePhrase(this.currentTool)
        : "None";
    },
    canUsePathfinder() {
      return this.selectionLength > 1 || !this.useResponsiveToolbar;
    },
    notMini() {
      return this.size.width > 70;
    },
    activeExtraFunc() {
      return this.extraFuncs.find((item) => {
        return item.active;
      });
    },
    activeMode() {
      return this.activeExtraFunc.icon[0];
    },
    dynamicGridTemplate() {
      return this.size.width < 88
        ? `1fr`
        : this.size.width < 128
        ? "1fr 1fr"
        : "1fr 1fr 1fr";
    },
    dynamicContextMenu() {
      return [
        {
          label: "Responsive UI",
          checkable: true,
          checked: this.useResponsiveToolbar,
          callback: this.assignResponsiveUI,
        },
        {
          label: "Extra functions",
          checkable: true,
          checked: this.hasExtraFuncs,
          callback: this.assignExtras,
        },
        {
          label: "Retain selection",
          checkable: true,
          checked: this.combSelection,
          callback: this.assignCombSelection,
        },
        {
          label: "Live preview",
          checkable: true,
          enabled: false,
          checked: false,
          callback: this.assignPreview,
        },
      ];
    },
    prefs() {
      return {
        useResponsiveToolbar: this.useResponsiveToolbar,
        combSelection: this.combSelection,
        showAnno: this.showAnno,
      };
    },
    dynamicButtonList() {
      if (this.hasExtraFuncs) {
        let list = [].concat(this.extraFuncs, this.list);
        return [].concat(list, this.extraList);
      } else {
        return this.list;
      }
    },
  },
  mounted() {
    this.reset();
    this.getPrefs();
    // console.log(this.dynamicButtonList);
  },
  data: () => ({
    currentTool: "",
    useResponsiveToolbar: true,
    selectionLength: 0,
    spacing: 0,
    showAnno: true,
    alignTo: "selection",
    hasExtraFuncs: true,
    combSelection: true,
    isGridDisplay: null,
    enablePreview: false,
    isAlt: false,
    inside: false,
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    extraFuncs: [
      {
        icon: "artboard",
        active: false,
      },
      {
        icon: "selection",
        active: true,
      },
    ],
    extraList: [
      {
        icon: "distribute-horizontal",
      },
      {
        icon: "distribute-vertical",
      },
    ],
    list: [
      {
        icon: "align-horizontal-left",
      },
      {
        icon: "align-horizontal-center",
      },
      {
        icon: "align-horizontal-right",
      },
      {
        icon: "align-vertical-top",
      },
      {
        icon: "align-vertical-center",
      },
      {
        icon: "align-vertical-bottom",
      },
      {
        icon: "distribute-horizontal-left",
      },
      {
        icon: "distribute-horizontal-center",
      },
      {
        icon: "distribute-horizontal-right",
      },
      {
        icon: "distribute-vertical-top",
      },
      {
        icon: "distribute-vertical-center",
      },
      {
        icon: "distribute-vertical-bottom",
      },
    ],
  }),
  watch: {
    "size.width"(val) {
      this.isGridDisplay = val < 160;
    },
    prefs: {
      handler(val) {
        this.setPrefs(val);
      },
      deep: true,
    },
    currentTool(val) {
      // console.log(val);
      // if (this.selectionLength > 1) {
      //   if (val && val.length) this.$refs.preview.grabSelection();
      // } else {
      //   console.log("NONE");
      // }
    },
  },
  methods: {
    switchMode(item) {
      this.makeActiveMode(item);
      item.active = true;
    },
    makeActiveMode(item) {
      this.extraFuncs.forEach((f) => {
        f.active = item == f;
      });
    },
    reset() {
      this.currentTool = null;
      this.isGridDisplay = window.innerWidth < 150;
    },
    assignShowAnno(v, i, a) {
      this.showAnno = a;
    },
    assignResponsiveUI(v, i, a) {
      this.useResponsiveToolbar = a;
    },
    assignCombSelection(v, i, a) {
      this.combSelection = a;
    },
    assignExtras(v, i, a) {
      this.hasExtraFuncs = a;
    },
    assignPreview(v, i, a) {
      this.enablePreview = a;
    },
    async distributeHandler(item, evt) {
      let opts = this.prefs,
        result;
      if (/horizontal/i.test(item.icon))
        await evalScript(`distributeHorizontalBySpacing(${this.spacing})`);
      else await evalScript(`distributeVerticalBySpacing(${this.spacing})`);
    },
    async clickHandler(item, evt) {
      let opts = this.prefs;
      if (!item.code) {
        let str = `${this.activeMode}-${item.icon
          .replace(/horizontal/, "hor")
          .replace(/vertical/, "ver")}`;
        console.log(str);
        let result = await evalScript(
          `executeAction('${str}', '${JSON.stringify(opts)}')`
        );
      }
    },
    setPrefs(value = null) {
      if (!value) value = this.prefs;
      window.localStorage.setItem("align", JSON.stringify(value));
    },
    getPrefs() {
      let data = window.localStorage.getItem("align");
      data = !data ? this.prefs : JSON.parse(data);
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    capitalizePhrase(phrase) {
      function capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
      }
      return !phrase.length
        ? ""
        : !/\s/.test(phrase)
        ? capitalize(phrase)
        : phrase
            .split(" ")
            .map((item) => {
              return capitalize(item);
            })
            .join(" ");
    },
  },
};
</script>

<style>
@media screen and (max-width: 56px) {
  .panel {
    padding: 8px 2px;
  }
  .row > * {
    margin-right: 0px;
  }
}

@media screen and (max-width: 80px) {
  .panel {
    padding: 8px 0px;
  }
  .row > * {
    margin-right: 0px;
  }
}

.button.flat {
  box-sizing: border-box;
  padding: 4px 2px;
}

.button {
  background: transparent !important;
}

.button:hover {
  background: var(--button-flat-hover) !important;
  border-color: var(--button-flat-hover-border);
}

.button:active {
  background: var(--button-flat-active) !important;
  border-color: var(--button-flat-active-border);
}

.button {
  box-sizing: border-box;
  max-width: calc(100vw - 2px);
  transition: all 100ms var(--quint) 20ms;
}

.centered {
  display: flex;
  justify-content: center;
}
</style>
