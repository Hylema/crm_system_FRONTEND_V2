<template>
  <div>
    <v-list v-if="!drawerIsMini">
      <v-list-item>
        <v-list-item-action>
          <v-icon dark>{{ 'mdi-weather-sunny'}}</v-icon>
        </v-list-item-action>
        <v-list-item-title>
          <input type="checkbox" class="dn" id="dn" ref="switch" v-model="themeIsDark" hidden>
          <label for="dn" class="toggle">
          <span class="toggle__handler">
            <span class="crater crater--1"></span>
            <span class="crater crater--2"></span>
            <span class="crater crater--3"></span>
          </span>
            <span class="star star--1"></span>
            <span class="star star--2"></span>
            <span class="star star--3"></span>
            <span class="star star--4"></span>
            <span class="star star--5"></span>
            <span class="star star--6"></span>
          </label>
        </v-list-item-title>
        <v-list-item-action>
          <v-icon dark>{{ 'mdi-weather-night'}}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-btn height="66px" dark text v-else @click.stop="themeIsDark = !themeIsDark">
      <v-icon dark v-if="themeIsDark">{{ 'mdi-weather-sunny'}}</v-icon>
      <v-icon dark v-else>{{ 'mdi-weather-night'}}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'DayAndNight',
  props: {
    value: Boolean,
    drawerIsMini: Boolean
  },
  mixins: [],
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    themeIsDark: {
      get (): boolean {
        return this.value
      },
      set (value: boolean): void {
        if (value === null) value = false

        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 0 !important;
}
</style>

<style scoped lang="scss">
body {
  background-color: #1E314F;
  font-family: 'Helvetica Rounded', 'Arial Rounded MT Bold','Montserrat', sans-serif;
  color: #fff;
}

.toggleWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  padding: 0 200px;
  transform: translate3d(-50%, -50%, 0);

  input {
    position: absolute;
    left: -99em;
  }
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 110px;
  height: 40px;
  background-color: #4a76a8;
  border-radius: 90px - 6;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

  //&:before {
  //  content: 'AM';
  //  position: absolute;
  //  left: -50px;
  //  top: 15px;
  //  font-size: 18px;
  //}
  //
  //&:after {
  //  content: 'PM';
  //  position: absolute;
  //  right: -48px;
  //  top: 15px;
  //  font-size: 18px;
  //  color: #749ED7;
  //}
}

.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 50px - 16;
  height: 50px - 16;
  background-color: #FFCF96;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform:  rotate(-45deg);

  .crater {
    position: absolute;
    background-color: #E8CDA5;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    border-radius: 100%;
  }

  .crater--1 {
    top: 18px;
    left: 10px;
    width: 4px;
    height: 4px;
  }

  .crater--2 {
    top: 28px;
    left: 22px;
    width: 6px;
    height: 6px;
  }

  .crater--3 {
    top: 10px;
    left: 25px;
    width: 8px;
    height: 8px;
  }
}

.star {
  position: absolute;
  background-color: #ffffff;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px,0,0);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  transform: translate3d(3px,0,0);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px,0,0);
}

input:checked {
  + .toggle {
    background-color: #3e455f;

    &:before {
      color: #749ED7;
    }

    &:after {
      color: #ffffff;
    }

    .toggle__handler {
      background-color: #FFE5B5;
      transform: translate3d(70px, 0, 0) rotate(0);

      .crater { opacity: 1; }
    }

    .star--1 {
      width: 2px;
      height: 2px;
    }

    .star--2 {
      width: 4px;
      height: 4px;
      transform: translate3d(-5px, 0, 0);
    }

    .star--3 {
      width: 2px;
      height: 2px;
      transform: translate3d(-7px, 0, 0);
    }

    .star--4,
    .star--5,
    .star--6 {
      opacity: 1;
      transform: translate3d(0,0,0);
    }
    .star--4 {
      transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--5 {
      transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--6 {
      transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  }
}
</style>
