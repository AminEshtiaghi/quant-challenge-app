<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4" >
        <v-card elevation="0">
          <h3 align="center" class=" font-weight-light">
            Please pass through our authentication gate:
          </h3>
        </v-card>
        <v-card-text>
          <v-form>
            
            <v-alert
              border="left"
              elevation="1"
              color="red"
              dismissible
              outlined
              type="error"
              v-if="!!hasError"
            >{{error_message}}
            <ul v-if="hasErrorList">
              <li v-for="error in errors.email" :key="error">
                {{error}}
              </li>
              <li v-for="error in errors.password" :key="error">
                {{error}}
              </li>
              <li v-for="error in errors.remember" :key="error">
                {{error}}
              </li>
            </ul>
            </v-alert>
            
            <v-text-field label="Email" id="email" name="email" v-model="email"
              prepend-inner-icon="mdi-at" type="email"
              class="rounded-0" outlined/>
            <v-text-field label="Password" id="password" name="password" v-model="password"
              prepend-inner-icon="mdi-lock-outline" type="password"
              class="rounded-0" outlined/>
            <v-btn
              id="btn_login"
              block
              color="primary"
              elevation="1"
              outlined
              :loading="isLoading"
              :disabled="isLoading"
              @click="login"
            >Log in</v-btn>

            <v-card-actions>
              <v-checkbox label="Remember me" v-model="remember" ></v-checkbox>
              <v-spacer />
              <div>
                Don't have account? 
                <router-link :to="{name: 'constructing'}" class="pl-1" >
                  Sign up
                </router-link>
                <br>
                Have account? but 
                <router-link :to="{name: 'constructing'}" class="pl-1" >
                  Forgot password!
                </router-link>
              </div>
            </v-card-actions>

          </v-form>

          <v-card-actions align="center" class="d-block mx-auto">
            <p>
              By continuing, you do agree with our 
              <router-link :to="{name: 'constructing'}">Terms</router-link> 
              and 
              <router-link :to="{name: 'constructing'}">Conditions</router-link>.
            </p>
          </v-card-actions>

          <v-card-text>
            <v-alert
              border="left"
              elevation="1"
              dismissible
              outlined
              text
              type="warning"
            >
            Since this is a test, after runing the `php artisan db:seeder`, you can use following data:
            <br>
            <b>Email: </b>eshtiaghi.amin@gmail.com
            <br>
            <b>Password: </b>pleasechangeme
            </v-alert>
          </v-card-text>

        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthActionResponse, LoginRequest, PossibleErrors } from '../../models/Auth';

interface componentData {
  email: string|null,
  password: string|null,
  remember: boolean,
  error_message: string|null,
  errors: PossibleErrors|null,
  isLoading: boolean
}

export default Vue.extend({
  name: "LoginComponent",
  data() {
    return {
      email: null,
      password: null,
      remember: false,
      error_message: null,
      errors: null,
      isLoading: false,
    } as componentData
  },
  computed: {
    hasError(): boolean {
      return !!this.error_message;
    },
    hasErrorList(): boolean {
      return this.errors !== null;
    }
  },
  methods: {
    validation(): boolean {
      this.error_message = null;
      this.errors = null;

      if (!this.email) {
        this.error_message = "Please enter your email address!";
        return false;
      }

      if (!this.password) {
        this.error_message = "Please enter your password!";
        return false;
      }

      return true;
    },
    async login() {
      if (!this.validation()) {
        return;
      }

      const data = {
        email: this.email? this.email: 'null',
        password: this.password? this.password: 'null',
        remember: this.remember,
      } as LoginRequest;

      this.isLoading = true;
      const response: AuthActionResponse = await this.$store.dispatch('auth/login', data);
      
      if (response.token) {
        this.$router.push({name: 'index'});

      } else {
        this.error_message = response.message;
        this.errors = response.errors
      }

      this.isLoading = false;

    }
  }
});
</script>
