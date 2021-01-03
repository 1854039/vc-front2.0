// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    const express = 'YT3003047302006'
    browser
      .url(devServer)
     //检测导航栏查询快递部分是否存在
      browser.pause(3000)
      .waitForElementVisible('#app > div.navigation > ul > li.el-menu-item.searchProcess.is-active', 10000)
      
      //判断查询按钮是否被选中
      browser.expect.element('#app > div.navigation > ul > li.el-menu-item.searchProcess.is-active').not.to.be.selected.before(500);

      // 点击进入查询页面
      browser.click('#app > div.navigation > ul > li.el-menu-item.searchProcess.is-active');
      
      //输入查询单号
      browser.setValue('#searchExpress_input', express);

      //选择快递类型（点击选择下拉 选择自动识别）
      browser.click('#searchExpress_row > div:nth-child(1) > div > div > span > span > i');
      browser.click('body > div.el-select-dropdown.el-popper > div.el-scrollbar > div.el-select-dropdown__wrap.el-scrollbar__wrap > ul > li:nth-child(1)');
     
      //点击查询
      browser.click('#searchExpress_btn');

      //检查地图在不在
      //browser.assert.ElementPresent('')
      //点击地图上的点
      //退出
      browser.end();

  }
}
