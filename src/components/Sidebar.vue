<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.menuPath" :key="item.menuPath">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.menuName }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.menuPath" :key="subItem.menuPath">
                                <template #title>{{ subItem.menuName }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.menuPath">
                                    {{ threeItem.menuName }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.menuPath" :key="subItem.menuPath">{{ subItem.menuName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menuPath" :key="item.menuPath">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.menuName }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        // const items = [
        //     {
        //         icon: "el-icon-lx-home",
        //         menuPath: "/dashboard",
        //         menuName: "系统首页",
        //     },
        //     {
        //         icon: "el-icon-lx-cascades",
        //         menuPath: "/table",
        //         menuName: "基础表格",
        //     },
        //     {
        //         icon: "el-icon-lx-copy",
        //         menuPath: "/tabs",
        //         menuName: "tab选项卡",
        //     },
        //     {
        //         icon: "el-icon-lx-calendar",
        //         menuPath: "3",
        //         menuName: "表单相关",
        //         children: [
        //             {
        //                 menuPath: "/form",
        //                 menuName: "基本表单",
        //             },
        //             {
        //                 menuPath: "/upload",
        //                 menuName: "文件上传",
        //             },
        //             {
        //                 menuPath: "4",
        //                 menuName: "三级菜单",
        //                 subs: [
        //                     {
        //                         menuPath: "/editor",
        //                         menuName: "富文本编辑器",
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-emoji",
        //         menuPath: "/icon",
        //         menuName: "自定义图标",
        //     },
        //     {
        //         icon: "el-icon-pie-chart",
        //         menuPath: "/charts",
        //         menuName: "schart图表",
        //     },
        //     {
        //         icon: "el-icon-lx-global",
        //         menuPath: "/i18n",
        //         menuName: "国际化功能",
        //     },
        //     {
        //         icon: "el-icon-lx-warn",
        //         menuPath: "7",
        //         menuName: "错误处理",
        //         children: [
        //             {
        //                 menuPath: "/permission",
        //                 menuName: "权限测试",
        //             },
        //             {
        //                 menuPath: "/404",
        //                 menuName: "404页面",
        //             },
        //         ],
        //     },
        //     {
        //         icon: "el-icon-lx-redpacket_fill",
        //         menuPath: "/donate",
        //         menuName: "支持作者",
        //     },
        // ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();

        const items = computed(() => store.state.auth.menus); //从store
        const collapse = computed(() => store.state.collapse);


        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
