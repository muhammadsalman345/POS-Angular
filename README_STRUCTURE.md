src/
│
├── app/
│   ├── core/                      # 🔥 App-wide services (singleton)
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── api.service.ts
│   │   │   └── theme.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   └── product.model.ts
│   │   ├── core.module.ts
│   │   └── index.ts
│   │
│   ├── shared/                    # 🔥 Reusable components/modules
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── loader/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── shared.module.ts
│   │
│   ├── layout/                    # 🔥 Header + Footer + Sidebar
│   │   ├── layout.component.ts
│   │   ├── layout.component.html
│   │   ├── layout.component.scss
│   │   ├── sidebar/
│   │   │   ├── sidebar.component.ts
│   │   │   ├── sidebar.component.html
│   │   │   ├── sidebar.component.scss
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   ├── header.component.scss
│   │   ├── footer/
│   │       ├── footer.component.ts
│   │       ├── footer.component.html
│   │       ├── footer.component.scss
│   │
│   ├── pages/                    # 🔥 Feature Modules / Screens
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.scss
│   │   ├── products/
│   │   │   ├── products.component.ts
│   │   │   ├── products.component.html
│   │   │   └── products.component.scss
│   │   ├── login/
│   │   ├── register/
│   │   └── settings/
│   │
│   ├── app.routes.ts
│   └── app.component.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── styles/                        # 🔥 Global SCSS Theme System
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _typography.scss
│   ├── _layout.scss
│   ├── _light-theme.scss
│   ├── _dark-theme.scss
│   ├── themes.scss                # Main theme loader
│   └── styles.scss                # Global style root
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
└── main.ts



// second 

src/
│
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.store.ts
│   │   │   ├── api/
│   │   │   │   ├── api.service.ts
│   │   │   │   └── http.service.ts
│   │   │   ├── theme/
│   │   │   │   ├── theme.service.ts
│   │   │   │   └── theme.config.ts
│   │   │   └── notification/
│   │   │       └── notification.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── loading.interceptor.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── validators.ts
│   │   └── core.module.ts
│   │
│   ├── shared/
│   │   ├── ui/
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   ├── button.component.html
│   │   │   │   └── button.component.scss
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.scss
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.scss
│   │   │   └── layout.component.ts
│   │   │   ├── layout.component.html
│   │   │   └── layout.component.scss
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.scss
│   │   │   │   └── register/
│   │   │   │       ├── register.component.ts
│   │   │   │       ├── register.component.html
│   │   │   │       └── register.component.scss
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   │   └── dashboard-page/
│   │   │   │       ├── dashboard-page.component.ts
│   │   │   │       ├── dashboard-page.component.html
│   │   │   │       └── dashboard-page.component.scss
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── products/
│   │   │   └── pages/
│   │   │       └── product-list/
│   │   │           └── product-list.component.ts
│   │   │
│   │   └── settings/
│   │       └── pages/
│   │           └── settings-page/
│   │               └── settings-page.component.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── api-response.model.ts
│   │   └── index.ts
│   │
│   ├── app.routes.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.module.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── data/
│
├── styles/
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _forms.scss
│   │   └── _tables.scss
│   ├── layout/
│   │   ├── _grid.scss
│   │   ├── _header.scss
│   │   ├── _sidebar.scss
│   │   └── _footer.scss
│   ├── themes/
│   │   ├── _light-theme.scss
│   │   ├── _dark-theme.scss
│   │   └── _material-theme.scss
│   ├── utilities/
│   │   ├── _spacing.scss
│   │   ├── _colors.scss
│   │   └── _display.scss
│   └── styles.scss
│
├── environments/
│   ├── environment.ts
│   ├── environment.prod.ts
│   └── environment.dev.ts
│
└── main.ts