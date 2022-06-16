const theme = {
  chalk: {
    backgroudColor: '#161522', // 背景颜色
    titleColor: '#fff', // 标题的颜色
    logoSrc: 'logo_dark.png', // logo图片路径
    themeSrc: 'qiehuan_dark.png', // 切换按钮
    headerBorderSrc: 'header_border_dark.png' // 页面顶部背景图
  },
  vintage: {
    backgroudColor: '#ffffff', // 背景颜色
    titleColor: '#000000', // 标题的颜色
    logoSrc: 'logo_light2.png', // logo图片路径
    themeSrc: 'qiehuan_light.png', // 切换按钮
    headerBorderSrc: 'header_border_light.png' // 页面顶部背景图
  }
}
export function getThemeValue (themeName) {
  return theme[themeName]
}
