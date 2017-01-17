import $ from 'jquery'
import Hammer from 'hammerjs'

export const intent = {
  setup () {
    // Sidebar
    const $sidebar = $('.ui.sidebar')
    $sidebar
      .sidebar({
        transition: 'overlay',
        mobileTransition: 'overlay'
      })
      .sidebar('attach events', '.pusher .content.icon')
      .sidebar('attach events', '.ui.sidebar .remove.icon')
      .sidebar('attach events', '.a1.plus.cell')

    const gestObserver = new Hammer($sidebar[0])
    gestObserver.on('swipeleft', () => $sidebar.sidebar('hide'))

    // Text Modals
    const $cookiesModal = $('.a1.cookies.modal')
    $cookiesModal
      .modal({
        transition: 'fade down'
      })
      .modal('attach events', '.a1.cookies.item', 'show')

    const $legalModal = $('.a1.legal.modal')
    $legalModal
      .modal({
        transition: 'fade down'
      })
      .modal('attach events', '.a1.legal.item', 'show')

    const $creditsModal = $('.a1.credits.modal')
    $creditsModal
      .modal({
        transition: 'fade down'
      })
      .modal('attach events', '.a1.credits.item', 'show')

    // Video Modals
    const videoModals = [
      { selector: '.a1.v1.modal', triggers: ['.ui.link.items .a1.v1.item', '.a1.v1.floor.cell'] },
      { selector: '.a1.e11.modal', triggers: ['.ui.link.items .a1.e11.item'] },
      { selector: '.a1.e12.modal', triggers: ['.ui.link.items .a1.e12.item'] },
      { selector: '.a1.v2.modal', triggers: ['.ui.link.items .a1.v2.item', '.a1.v2.floor.cell'] },
      { selector: '.a1.v3.modal', triggers: ['.ui.link.items .a1.v3.item', '.a1.v3.floor.cell'] },
      { selector: '.a1.e2.modal', triggers: ['.ui.link.items .a1.e2.item'] },
      { selector: '.a1.e3.modal', triggers: ['.ui.link.items .a1.e3.item'] },
      { selector: '.a1.e4.modal', triggers: ['.ui.link.items .a1.e4.item'] }
    ]

    const setupVideoModal = (modal) => {
      const $videoModal = $(modal.selector)
      const $video = $videoModal.find('.ui.embed').first()

      $videoModal
        .modal({
          transition: 'scale',
          onShow () { $video.embed() },
          onHide () { $video.embed('destroy') }
        })

      modal.triggers.forEach((selector) => $videoModal.modal('attach events', selector, 'show'))
    }

    videoModals.forEach(setupVideoModal)
  }
}
