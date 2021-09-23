export const navController = (btn, pageIndex, pages, navBtns) => {
    if (btn === 'next' && pageIndex === pages.length - 1 && navBtns[1].value === 'Submit') {
        return 'submit'
    } else {
        if (btn === 'next') {
            pageIndex = pageIndex + 1 < pages.length ? pageIndex + 1 : pageIndex
        } else {
            pageIndex = pageIndex - 1 >= 0 ? pageIndex - 1 : pageIndex
        }

        for (let i = 0; i < pages.length; i++) {
            if (i === pageIndex) {
                pages[i].classList.remove('inactive')
            } else {
                if (!pages[i].classList.contains('incative')) {
                    pages[i].classList.add('inactive')
                }
            }
        }

        if (pageIndex > 0 && navBtns[0].classList.contains('hidden')) {
            navBtns[0].classList.remove('hidden')
        } else if (pageIndex === 0 && !navBtns[0].classList.contains('hidden')) {
            navBtns[0].classList.add('hidden')
        }

        if (pageIndex === pages.length - 1 && navBtns[1].value === 'Next') {
            navBtns[1].value = 'Submit'
        } else if (pageIndex < pages.length - 1 && navBtns[1].value === 'Submit') {
            navBtns[1].value = 'Next'
        }

        return pageIndex
    }
}
