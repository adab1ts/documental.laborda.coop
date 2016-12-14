import $ from 'jquery'

export const intent = {
  setup () {
    const $sidebar = $('.ui.sidebar')

    const $v1Modal = $('.a1.v1.modal')
    const $e1Modal = $('.a1.e1.modal')
    const $e2Modal = $('.a1.e2.modal')
    const $v2Modal = $('.a1.v2.modal')

    const $v1 = $v1Modal.find('.ui.embed').first()
    const $e1 = $e1Modal.find('.ui.embed').first()
    const $e2 = $e2Modal.find('.ui.embed').first()
    const $v2 = $v2Modal.find('.ui.embed').first()

    $sidebar
      .sidebar({
        transition: 'overlay',
        mobileTransition: 'overlay'
      })
      .sidebar('attach events', '.pusher .content.icon')
      .sidebar('attach events', '.ui.sidebar .remove.icon')
      .sidebar('attach events', '.a1.plus.cell')

    $v1Modal
      .modal({
        transition: 'scale',
        onShow () { $v1.embed() },
        onHide () { $v1.embed('destroy') }
      })
      .modal('attach events', '.a1.v1.floor.cell', 'show')
      .modal('attach events', '.ui.link.items .a1.v1.item', 'show')

    $e1Modal
      .modal({
        transition: 'scale',
        onShow () { $e1.embed() },
        onHide () { $e1.embed('destroy') }
      })
      .modal('attach events', '.ui.link.items .a1.e1.item', 'show')

    $e2Modal
      .modal({
        transition: 'scale',
        onShow () { $e2.embed() },
        onHide () { $e2.embed('destroy') }
      })
      .modal('attach events', '.ui.link.items .a1.e2.item', 'show')

    $v2Modal
      .modal({
        transition: 'scale',
        onShow () { $v2.embed() },
        onHide () { $v2.embed('destroy') }
      })
      .modal('attach events', '.a1.v2.floor.cell', 'show')
      .modal('attach events', '.ui.link.items .a1.v2.item', 'show')
  }
}
