import router from '../../router'

export const with404 = () => {
  router.push('/404')
}

export const with401 = () => {
  router.push('/401')
}

