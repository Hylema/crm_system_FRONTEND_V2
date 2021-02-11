export const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}

export const Api = {
  AUTH: {
    LOGIN: {
      ROUTE: '/api/v1/auth/login/',
      OPERATION: 'Авторизация'
    },
    TOKEN_VERIFY: {
      ROUTE: '/api/v1/auth/verify/',
      OPERATION: 'Проверка access токена'
    },
    REFRESH_TOKEN: {
      ROUTE: '/api/v1/auth/refresh/',
      OPERATION: 'Получение нового токена по refresh'
    },
    USER: {
      ROUTE: '/api/v1/auth/user',
      OPERATION: 'Получение данных текущего авторизованного пользователя'
    }
  },
  USERS: {
    GET_ALL_USERS: {
      ROUTE: '/api/v1/users/',
      OPERATION: 'Получение всех пользователей в системе'
    },
    GET_USER_BY_ID: {
      ROUTE: '/api/v1/users/',
      OPERATION: 'Получение пользователя по id',
      HAS_INDEX_ATTRIBUTE: true,
      METHOD: HttpMethod.GET
    },
    CREATE_USER: {
      ROUTE: '/api/v1/admin/user/',
      OPERATION: 'Создание польхователя',
      METHOD: HttpMethod.POST
    },
    PUT_USER: {
      ROUTE: '/api/v1/admin/user/',
      OPERATION: 'Обновление всех полей пользователя',
      METHOD: HttpMethod.PUT
    },
    PATCH_USER: {
      ROUTE: '/api/v1/admin/user/',
      OPERATION: 'Обновление одного поля у пользователя',
      METHOD: HttpMethod.PATCH
    },
    DELETE_USER: {
      ROUTE: '/api/v1/admin/user/',
      OPERATION: 'Удаление пользователя',
      METHOD: HttpMethod.DELETE
    }
  },

  // USER: {
  //   CHANGE_AVATAR: '/api/v1/user/avatar'
  // },
  //
  // TASKS: {
  //   GET_ALL_TASKS: '/api/v1/tasks',
  //   GET_TASK_DETAILS: '/tasks/detail',
  //   MAKE_TASK_COMMENT: '/tasks/comments/',
  //   CREATE_TASK: '/tasks/maketask/'
  // },
  //
  // FILES: {
  //   UPLOAD: '/api/v1/files/upload',
  //   UPLOADS: '/api/v1/files/uploads',
  //   DOWNLOAD: '/api/v1/files/download'
  // },
  toOneObject (): object {
    let obj: object = {}

    for (const [key, value] of Object.entries(Api)) {
      if (typeof value === 'object') {
        obj = { ...obj, ...value }
      }
    }

    return obj
  }
}
export const BackendUrl = 'http://localhost:9090'
export const LocalStorage = {
  AUTH: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    LAST_UPDATE_TOKENS: 'last_update_tokens',
    USER_IS_ADMIN: 'user_is_admin',
    CURRENT_USER: 'current_user'
  },
  THEME: {
    THEME_IS_DARK: 'theme_is_dark',
    DRAWER: 'drawer'
  }
}
export const WebSockets = {
  USERS: {
    CREATED: {
      ROUTE: '/usr/create',
      OPERATION: 'Новый созданный пользователь'
    },
    UPDATED: {
      ROUTE: '/usr/update',
      OPERATION: 'Измененный пользователь'
    },
    DELETED: {
      ROUTE: '/usr/delete',
      OPERATION: 'Удаленный пользователь'
    }
  },
  toOneObject (): object {
    let obj: object = {}

    for (const [key, value] of Object.entries(WebSockets)) {
      if (typeof value === 'object') {
        obj = { ...obj, ...value }
      }
    }

    return obj
  }
}
export const Routers = {
  APP: {
    PATH: '',
    NAME: 'App'
  },
  AUTH: {
    PATH: '/auth',
    NAME: 'Auth'
  },
  MAIN: {
    PATH: '',
    NAME: 'Main'
  },
  PROFILE: {
    PATH: '/profile/:id',
    NAME: 'Profile'
  },
  ADMIN: {
    PATH: '/admin',
    NAME: 'Admin'
  },
  USERS: {
    PATH: '',
    NAME: 'Users'
  },
  LOADING: {
    PATH: '/loading',
    NAME: 'LoadingApp'
  },
  NOTFOUND: {
    PATH: '*',
    NAME: 'NotFound'
  }
}
export const Field = {
  EMAIL: 'email',
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  PASSWORD: 'password'
}
// export const BackendUrl = 'https://crm-system-aegis-backend.herokuapp.com'
