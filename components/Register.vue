<template>
  <v-layout column align-center style="padding: 20px;background-color: white">
    <v-form
      ref="form"
      v-model="valid">
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show4 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required]"
        :type="show4 ? 'text' : 'password'"
        name="input-10-2"
        label="密码"
        @click:append="show4 = !show4"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-2"
        @click="register"
      >
        注册
      </v-btn>
      <v-btn
        color="error"
        class="mr-2"
        @click="reset"
      >
        重置
      </v-btn>
      <v-btn
        color="primary"
        class="mr-2"
        @click="close"
      >
        关闭
      </v-btn>

    </v-form>
  </v-layout>
</template>

<script>
import { setUserInfo, setToken, removeToken } from '@/utils/store'

export default {
  name: 'Register',
  props: {
    close: {
      type: Function,
      default: null
    },
    tips: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '用户名必填',
        v => (v && v.length <= 20) || '用户名长度必须小于20'
      ],
      show4: false,
      password: '',
      rules: {
        required: value => !!value || '密码必填.',
        min: v => v.length >= 8 || '密码长度必须大于8位'
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    async login() {
      const form = {}
      form.username = this.name
      form.password = this.password
      const data = await this.$axios.$post('/user/login', form)
      if (data.success !== false) {
        this.tips('success', '登录成功')
        this.close()
        setToken(data)
        this.getUserInfo()
      } else {
        this.tips('error', data.msg || '登录失败')
      }
    },
    async register() {
      if (this.$refs.form.validate()) {
        const form = {}
        form.username = this.name
        form.password = this.password
        form.email = this.name + '@blog.com'
        const data = await this.$axios.$post('/user/register', form)
        if (data.success !== false) {
          this.tips('success', '注册成功')
          this.close()
          this.login()
        } else {
          this.tips('error', data.msg || '注册失败')
        }
      }
    },
    async getUserInfo() {
      const data = await this.$axios.$get('/user/getOneById')
      if (data.success !== false) {
        this.$store.commit('SET_USER', data)
        setUserInfo(data)
      } else {
        this.tips('error', data.msg || '登录失败')
        removeToken()
      }
    }
  }
}
</script>
