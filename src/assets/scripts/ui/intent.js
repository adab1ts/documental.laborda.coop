import $ from 'jquery'

export const intent = {
  setup () {
    const $sidebar = $('.ui.sidebar')

    $sidebar
      .sidebar({
        transition: 'overlay',
        mobileTransition: 'overlay'
      })
      .sidebar('attach events', '.pusher .content.icon')
      .sidebar('attach events', '.ui.sidebar .remove.icon')
      .sidebar('attach events', '.a1.plus.cell')
  }
}
