const book = {
  home: {
    root: () => '/',
    item: (id: any = ':id') => '/' + id
  },
}

export default book;