<template>
  <nav class="navbar">
    <ul>
      <li
        v-for="item in navItems"
        :key="item.id"
        :class="{ active: item.id === activeId }"
        @click="handleClick(item.id, item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RdNavbar',

  props: {
    navItems: {
      type: Array,
      default: () => [],
      required: true,
    },
    activeId: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick(id, name) {
      this.$emit('clickNavItem', id)
      this.$emit('sendGaEvent', { action: 'click', label: `${name}索引` })
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: var(--secondary-color);
  font-size: 16px;
  line-height: 24px;
  box-shadow: 0px 8px 8px -4px rgba(0, 0, 0, 0.1);
  position: relative;
  @include media-breakpoint-up(md) {
    font-size: 18px;
  }
}

ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 618px;
  margin: 0 auto;
}

li {
  max-width: 174px;
  padding: 12px 24px;
  width: calc((100% - 32px) / 3);
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: 300;
  @include media-breakpoint-up(md) {
    padding: 16px 24px;
  }

  &:hover {
    font-weight: 500;
  }

  &.active {
    color: #161616;
    position: relative;
    font-weight: 500;

    &::after {
      content: '';
      display: block;
      background-color: var(--primary-color);
      width: 100%;
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
