# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.2-v.0"></a>
## 0.1.2-v.0 (2019-07-31)

### Bug Fixes

* STRM-415 ([#52](https://github.com/PBSA/StreamersEdge-GUI/issues/52))
  * Better error handling on the register form.
* STRM-416 ([#55](https://github.com/PBSA/StreamersEdge-GUI/issues/55))
  * More specific errors on the login in form.
* STRM-430 ([#53](https://github.com/PBSA/StreamersEdge-GUI/issues/5))
  * Text wrapping issue on the login form.


<a name="0.1.1"></a>
## 0.1.1 (2019-07-19)


### Bug Fixes

* **start.js:** removed os check breaking hot reloading ([#5](https://github.com/PBSA/StreamersEdge-GUI/issues/5)) ([0a269eb](https://github.com/PBSA/StreamersEdge-GUI/commit/0a269eb))
* fixed invisible overlap ([#19](https://github.com/PBSA/StreamersEdge-GUI/issues/19)) ([7aa267c](https://github.com/PBSA/StreamersEdge-GUI/commit/7aa267c))
* styling issue main site backgroun


### Features

* site version display if in dev mode ([2f6f69e](https://github.com/PBSA/StreamersEdge-GUI/commit/2f6f69e))
  * Footer component
* wrapped the input text field with styling ([#18](https://github.com/PBSA/StreamersEdge-GUI/issues/18)) ([86cd778](https://github.com/PBSA/StreamersEdge-GUI/commit/86cd778))
* Streamers Edge profile image uploading
* Custom input fields using Material UI
* Custom modals for use in
  * Login
  * Any other content can be pushed into this modal
* Streamers Edge profile creation
* Registration Page
  * Streamers Edge system registration
    * Email verification
  * Facebook OAuth registration
  * YouTube/Google OAuth registration
* Base site, routing (private/public route(s)), & repo initialization.
  * ESlint
  * Stylelint
  * Commitizen
  * Commitlint
  * SonarCloud
  * Standard-version
  * Conventional Changelog
  * Translation compatible use of strings
  * Header component
