<template>
  <div class="icon-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="24"
      height="24"
    >
      <path
        v-if="name == 'align-horizontal-center'"
        class="default-icon"
        d="M24,23H17v3H15V23H8V17h7V15H11V9h4V6h2V9h4v6H17v2h7Z"
      />
      <path
        v-else-if="name == 'align-horizontal-left'"
        class="default-icon"
        d="M10,17H26v6H10V17M20,9H10v6H20V9M6,6V26H8V6Z"
      />
      <path
        v-else-if="name == 'align-horizontal-right'"
        class="default-icon"
        d="M22,17v6H6V17H22M12,9v6H22V9H12M24,6V26h2V6Z"
      />
      <path
        v-else-if="name == 'align-vertical-center'"
        class="default-icon"
        d="M9,24V17H6V15H9V8h6v7h2V11h6v4h3v2H23v4H17V17H15v7Z"
      />
      <path
        v-else-if="name == 'align-vertical-top'"
        class="default-icon"
        d="M15,10V26H9V10h6m8,10V10H17V20h6M26,6H6V8H26Z"
      />
      <path
        v-else-if="name == 'align-vertical-bottom'"
        class="default-icon"
        d="M15,22H9V6h6V22m8-10H17V22h6V12m3,12H6v2H26Z"
      />
      <path
        v-else-if="name == 'distribute-vertical-top'"
        class="default-icon"
        d="M8,20H24v6H8V20M21,9H11v6H21V9m5,8H6v2H26ZM26,6H6V8H26Z"
      />
      <path
        v-else-if="name == 'distribute-vertical-center'"
        class="default-icon"
        d="M24,20.52h2v2H24v2H8v-2H6v-2H8v-2H24Zm-3-11v-2H11v2H6v2h5v2H21v-2h5v-2Z"
      />
      <path
        v-else-if="name == 'distribute-vertical-bottom'"
        class="default-icon"
        d="M24,17v6H8V17ZM21,6H11v6H21ZM6,13v2H26V13ZM6,26H26V24H6Z"
      />
      <path
        v-else-if="name == 'distribute-horizontal-right'"
        class="default-icon"
        d="M6,8h6V24H6ZM17,21h6V11H17Zm-4,5h2V6H13ZM24,6V26h2V6Z"
      />
      <path
        v-else-if="name == 'distribute-horizontal-center'"
        class="default-icon"
        d="M24.48,21h-2v5h-2V21h-2V11h2V6h2v5h2Zm-13-15h-2V8h-2V24h2v2h2V24h2V8h-2Z"
      />
      <path
        v-else-if="name == 'distribute-horizontal-left'"
        class="default-icon"
        d="M9,8h6V24H9Zm11,3V21h6V11ZM17,26h2V6H17ZM6,26H8V6H6Z"
      />
      <path
        v-else-if="name == 'distribute-vertical'"
        class="default-icon"
        d="M10.48,17h16v6h-16V17Zm10-8h-10v6h10V9ZM7.53,14.52V13.34h-1v1.18h-1v1h1v1h-1v1h1v1.1h1v-1.1h2v-1h-2v-1h2v-1Z"
      />
      <path
        v-else-if="name == 'distribute-horizontal'"
        class="default-icon"
        d="M15,10.52v16H9v-16Zm8,10v-10H17v10Zm-5.49-13h1.18v-1H17.49v-1h-1v1h-1v-1h-1v1h-1.1v1h1.1v2h1v-2h1v2h1Z"
      />
      <path
        v-else-if="name == 'selection'"
        class="default-icon"
        :style="{
          fill: color,
        }"
        d="M25.48,9.52v-3h-3v2H17.56v-2h-3v2H9.48v-2h-3v3H8.56v5H6.48v3H8.56v5H6.48v3h3v-2h5v2h3v-2h5v2h3v-3H23.56v-5h1.92v-3H23.56v-5Zm-2.92,8v5h-.08v0H9.56v-13h13v8Zm-8.08-3h3v3h-3Z"
      />
      <g v-else-if="name == 'artboard'">
        <g>
          <path
            :style="{
              fill: color,
            }"
            class="default-icon"
            d="M21.57,10.52H10.36v15h15V14.31Zm2.79,14h-13v-13h8.31v4.35h4.69Z"
          />
          <polygon
            :style="{
              fill: color,
            }"
            class="faded"
            points="24.36 15.87 24.36 24.52 11.36 24.52 11.36 11.52 19.67 11.52 19.67 15.87 24.36 15.87"
          />
        </g>
        <rect class="default-icon" x="10.36" y="6.52" width="1" height="2.87" />
        <rect class="default-icon" x="6.61" y="10.52" width="2.5" height="1" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "unite",
    },
    color: {
      type: String,
      default: `var(--color-default)`,
    },
  },
};
</script>

<style scoped>
.icon-wrapper {
  padding-top: 4px;
}
svg {
  width: 24px;
}

.default-icon,
.faded {
  fill: var(--color-icon);
}

.faded {
  opacity: 0.3;
}
</style>
