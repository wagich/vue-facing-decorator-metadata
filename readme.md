# Read me

This fork by @wagich adds the following:

* Support for inferring prop/model type using reflect-metadata (like vue-property-decorator) when using @Prop and @Model decorators
* Automatic debouncing for @Watch decorator, adds `debounce: number` to specify the timeout and `debounceImmediate: boolean` to specify leading (vs. the default trailing) invocation to decorator options.

![GitHub](https://img.shields.io/github/license/facing-dev/vue-facing-decorator) ![npm](https://img.shields.io/npm/v/vue-facing-decorator) ![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/vue-facing-decorator/peer/vue) ![lts](https://img.shields.io/badge/LTS-prepared-blue)

Designed for vue 3, do the same work like [vue-class-component](https://github.com/vuejs/vue-class-component) and [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).

* Community desired vue class component with typescript decorators.
* Compatible with both stage3 and stage2 decorators.
* Compatible with both TypeScript and JavaScript projects.
* Safety. Transform ES class to vue option api according to specifications.
* Performance. Once transform on project loading, ready for everywhere.
* Support ES class inheritance, vue `extends` and vue `mixins`.
* [Official recommended](https://class-component.vuejs.org).



Welcome to suggest and contribute.

-----------------

# Donate

[opencollective](https://opencollective.com/vue-facing-decorator)

# Document

[To document](https://facing-dev.github.io/vue-facing-decorator/#/)

Document languages: English, 简体中文, Portuguese

# Discussion

To discord [https://discord.gg/4exxtFgkcz](https://discord.gg/4exxtFgkcz)

QQ群号 766350254

# Awesome List

* [vuex-facing-decorator](https://github.com/wangzhiguoengineer/vuex-facing-decorator)

    Binding helpers for Vuex and vue-facing-decorator.
    