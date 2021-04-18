function newline2br(str = '') {
  return String(str).replace(/\n/g, '<br />')
}

export { newline2br }
