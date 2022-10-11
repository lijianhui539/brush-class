// ==UserScript==
// @name         Brush class
// @version      0.2
// @description  刷课脚本
// @author       李建辉
// ==/UserScript==

(function() {
    'use strict';
    console.log('开始执行刷课')
    const checkUrl = 'scjylearning'
    // 获取url
    let browserUrl = window.location.origin

    // 判断是否是刷课页面
    if(browserUrl.indexOf(checkUrl) === -1){
        return
    }

    const DELAY_TIME = 1000
    setInterval(() => {

        // 获取下一节课按钮
        let nextClassBtn = document.getElementsByClassName('layui-layer-btn0')[0]

        // 获取顶部按钮个数 只有一个 可以直接进入下一节课
        let topMenuCount = document.querySelector('#menu_tarr_content')?.children?.length

        // 获取到下一节课按钮 说明当前视频播放完毕 需要判断是否有链接和图文
        // 如果有链接和图文按钮 直接点击下一节课 会进入链接页面 不会进入下一节课
        if(nextClassBtn && topMenuCount === 1){
            nextClassBtn.click()
            return
        }

        // 如果顶部按钮大于1 需要挨个点击 然后再去获取左树课程
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            
        }
    }, DELAY_TIME);
})();