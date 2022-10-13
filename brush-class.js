// ==UserScript==
// @name         Brush class
// @version      0.2
// @description  刷课脚本
// @author       李建辉
// @match        https://scjylearning.o-learn.cn/*
// ==/UserScript==

(function () {
    "use strict";
    console.log("开始执行刷课");
    const checkUrl = "scjylearning";
    // 获取url
    const browserUrl = window.location.origin;

    // 判断是否是刷课页面
    if (browserUrl.indexOf(checkUrl) === -1) {
        return;
    }

    const DELAY_TIME = 3000;
    const TOP_MENU_DELAY_TIME = 1000

    setInterval(async () => {
        // 获取下一节课按钮
        const nextClassBtn = document.getElementsByClassName("layui-layer-btn0")[0];

        // 获取顶部按钮 只有一个 可以直接进入下一节课
        const topMenu = Array.from(document.querySelector("#menu_tarr_content")?.children);


        if (!nextClassBtn) return;

        // 获取到下一节课按钮 说明当前视频播放完毕 需要判断是否有链接和图文
        // 如果有链接和图文按钮 直接点击下一节课 会进入链接页面 不会进入下一节课
        if (nextClassBtn && topMenu?.length === 1) {
            nextClassBtn.click();
            return;
        } else {
            // 如果顶部按钮大于1 需要挨个点击 然后再去获取左树课程
            for (let index = 1; index < topMenu.length; index++) {
                const element = topMenu[index];
                await element.click();
            }

            /**
             * TODO: 待测试,待完善
             * 上方循环点击太快加上setTimeout 才能观察到是否点击了
             * 待测试直接循环点击是否计算入已看完视频
             */
            setTimeout(() => {


                // 获取左树所有的item
                const leftTreeItem = Array.from(
                    document.querySelectorAll(".course_chapter_item")
                );

                // 获取当前所在树item的index
                const activeIndex = leftTreeItem.findIndex((item) =>
                    item.className.includes("active")
                );

                if (activeIndex !== -1) {
                    // 获取下一个item
                    const targetElmChild = Array.from(
                        leftTreeItem[activeIndex + 1].children
                    );

                    // item 包含图标和title
                    targetElmChild.forEach((childElm) => {
                        const childElmClassName = childElm.className;

                        // 通过className 找到标题 点击跳转
                        if (childElmClassName.includes("section_title")) {
                            childElm.click();
                        }
                    });
                }
            }, TOP_MENU_DELAY_TIME)
        }
    }, DELAY_TIME);
})();
