<template>
  <el-menu default-active="2"
           router
           class="el-menu-vertical"
           :default-openeds="['1']"
           :collapse="menuCollapse">
    <el-sub-menu v-for="menu in menus"
                 :key="menu.label"
                 :index="menu.index">
      <template #title>
        <el-icon>
          <Files />
        </el-icon>
        <span>{{ menu.label }}</span>
      </template>
      <el-menu-item v-for="item in menu.children"
                    :key="item.index"
                    :index="item.index">{{ item.label }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import useAppStore from '../../store/modules/app'
import { Files } from '@element-plus/icons-vue'

const menuCollapse = computed(() => useAppStore().menuCollapse)
const menus = ref([])
menus.value = [
  {
    label: 'Beginner',
    index: '1',
    children: [
      { label: '01', index: '/beginner/01' },
      { label: '02 Primitives', index: '/beginner/02' }
    ]
  },
  {
    label: 'Intermediate',
    index: '2',
    children: [
      { label: '01', index: '/intermediate/01' }
    ]
  },
  {
    label: 'Advanced',
    index: '3',
    children: [
      { label: '01', index: '/advanced/01' }
    ]
  }
]
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  height: 100%;
  overflow-y: auto;
  border-right: 0;
  display: flex;
  flex-direction: column;

  &:not(.el-menu--collapse) {
    width: 240px;
  }

  .brand {
    height: 60px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: pink;
  }

  .empty {
    flex: 1;
  }
}
</style>
