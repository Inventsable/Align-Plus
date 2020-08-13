<template>
  <div id="app">
    <Menus refresh debug :context="dynamicContextMenu" />
    <Watcher
      v-if="scanSelection"
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
            @clickevt="switchModeHandler(item)"
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
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in list"
            :key="i"
            :disabled="!canUseAlign"
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
            :disabled="!canUseAlign"
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
    canUseAlign() {
      return true;
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
      return this.activeExtraFunc.icon;
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
          label: "Align Handles",
          checkable: true,
          checked: this.alignHandles,
          callback: this.assignAlignHandles,
        },
        {
          label: "Scan selection",
          checkable: true,
          enabled: false,
          checked: false,
          callback: this.assignScanSelection,
        },
      ];
    },
    prefs() {
      return {
        alignHandles: this.alignHandles,
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
    useResponsiveToolbar: false,
    selectionLength: 0,
    spacing: 0,
    alignTo: "selection",
    alignHandles: false,
    lastMode: "selection",
    hasExtraFuncs: true,
    scanSelection: false,
    isGridDisplay: null,
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
    lastMode(val) {
      console.log("LAST MODE:", val);
    },
    async inside(val) {
      if (val && !this.scanSelection) {
        this.selectionLength = await evalScript(`getRealSelectionLength()`);
      }
      if (val && this.selectionLength == 1) {
        this.lastMode = this.activeMode;
        this.switchMode("artboard");
      } else if (
        (val && this.selectionLength > 1) ||
        (val && this.selectionLength == 0)
      )
        this.switchMode(this.lastMode);
    },
  },
  methods: {
    switchModeHandler(item) {
      this.lastMode = item.icon;
      this.switchMode(item);
    },
    switchMode(item) {
      let temp = /string/i.test(typeof item)
        ? (temp = this.extraFuncs.find((entry) => {
            return entry.icon == item;
          }))
        : item;
      this.makeActiveMode(temp);
      temp.active = true;
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
    assignScanSelection(v, i, a) {
      this.scanSelection = a;
    },
    assignAlignHandles(v, i, a) {
      this.alignHandles = a;
    },
    async distributeHandler(item, evt) {
      let opts = this.prefs,
        result;
      console.log(item, evt);
      // if (/horizontal/i.test(item.icon))
      //   await evalScript(`distributeHorizontalBySpacing(${this.spacing})`);
      // else await evalScript(`distributeVerticalBySpacing(${this.spacing})`);
    },
    async clickHandler(item, evt) {
      let opts = this.prefs;
      if (!item.code) {
        console.log(item, evt, this.activeMode);
        let params = item.icon.split("-");
        let msg = {
          mode: params[0],
          axis: params[1],
          direction: params[2],
          type: this.activeMode,
        };

        let result = await evalScript(
          `${msg.mode}To('${JSON.stringify(msg)}', '${JSON.stringify(opts)}')`
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
