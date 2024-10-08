import Component from "../core/Component.js";

export default class Header extends Component{
    setEvent() {
        const {router, isLogin, changeIsLogin} = this.props
        this.addEvent('click', 'nav', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                if (e.target.id === 'profile' && !isLogin) {
                    router.navigateTo('/login');

                } else if (e.target.id === 'logout') {
                    localStorage.removeItem('user')
                    changeIsLogin(false)
                    router.navigateTo('/')
                } else {
                    router.navigateTo(e.target.pathname);
                }

            }
        })
    }

    template() {
        return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a id="profile" href="/profile" class="text-gray-600">프로필</a></li>
          <li id="login-li"><a id="login" href="/login" class="text-gray-600">로그인</a></li>
          <li id="logout-li"><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>
    `;
    }

    mounted() {
        const {router, isLogin, changeIsLogin} = this.props

        if (isLogin) {
            const $login = this.$target.querySelector('#login-li')
            $login.remove()
        } else {
            const $logout = this.$target.querySelector('#logout-li')
            $logout.remove()
        }

    }
}

