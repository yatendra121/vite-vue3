<template>
  <div
    class="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Form :initial-values="initialValues"
        :validation-schema="schema"
        @submit="onTest">
        <QInputWithValidation
          name="email"
          label="Email"
          placeholder="Email"
        />

        <QInputWithValidation
          label="Password"
          name="password"
          placeholder="p@$$vv0Rd"
        />
        <q-btn class="q-mt-md" color="primary" type="submit" label="Submit" />
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import QInputWithValidation from "@/components/QInputWithValidation.vue";
import useAuthUserRepository from "@/composables/auth/useAuthUserRepository";
import {_axios} from "@/plugins/axios";
import { defineComponent,reactive } from "vue";

export default defineComponent({
  components: {
    Field,
    Form,
    QInputWithValidation,
  },
   setup() {

     
const { userProfileStore } = useAuthUserRepository();


    const schema = yup.object({
   //  email: yup.string().required().email().label("Email address"),

    // password: yup.string().required().min(6).label("Password"),
      
    });

    // Providing initial values for the `terms` and `subscribed` fields
    // because q-checkbox has 3 states, in which undefined means undetermined
    // providing an explict false initial value avoids this
    const initialValues = reactive({
      email: 'admin@sagent.com',
      password: '12345678',
    });

    function onSubmit(values, actions) {
      alert('csacasc')
      console.log(JSON.stringify(values, null, 2));
     // actions.resetForm();
    }

    function onTest(values, actions) {
      _axios.post('login',values).then(response => {
        userProfileStore(response.data.user)
        console.log(response)
      }).catch( (response) => {
         actions.setErrors(response.response.data.errors);
       // console.log(response.response.data.errors)
      })
      console.log('ok')
      console.log(values)
      console.log(JSON.stringify(values, null));
     // actions.resetForm();
    }

    return {
      onSubmit,
      onTest,
      schema,
      initialValues,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    };
  },
});
</script>

