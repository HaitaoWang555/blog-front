
import Vue from 'vue'

import * as filters from './filters'
import { highlight } from './highlight'
import { directive } from 'namedavatar/src/vue'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.directive('highlight', highlight)
Vue.directive('avatar', directive)
