/**
 *  doc here
 */
export default async function({ route, app, store, redirect }) {
  if (route.params.name && route.params.name !== 'admin') {
    const event = await store.dispatch('getEvent', route.params.name);
    const isManager = store.getters.isClientManager;
    if (!event || (event.status !== 'admitted' && !isManager)) {
      let from = app.context.from;
      if (from && from.name.includes('login')) {
        from = '/';
      } else if (from && from.fullPath) {
        from = from.fullPath;
      } else {
        from = null;
      }

      return redirect((from || '/') + '?status=event_not_found');
    }

    let checkPinyin = true;
    if (['event-admit', 'event-post'].includes(route.name) ||
      route.name.includes('event-edit')) {
      checkPinyin = false;
    }

    let name = route.name;
    let news = route.params.news;
    if (event.pinyin && route.name === 'event') {
      name = 'event-pinyin';
    } else if (news) {
      name = +news ? 'event-news-pinyin' : 'event-pinyin';
    }

    if (route.query.news) {
      news = route.query.news;
      name = 'event-news-pinyin';
      delete route.query.news;
    }

    if (+event.id !== +route.params.name ||
      (checkPinyin && event.pinyin && event.pinyin !== route.params.pinyin) ||
      (route.params.news !== news)) {
      const params = {
        name: event.id,
        pinyin: event.pinyin,
        news: news || event.pinyin,
      };

      return redirect({
        ...route,
        params,
        name,
      });
    }
  }
};
