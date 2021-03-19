import history from '../history'

export const goBack = () => history.goBack()

export const navigateTo = (path) => history.push(path)
