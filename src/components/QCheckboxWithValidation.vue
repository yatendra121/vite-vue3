
<template>
  <q-field
    :borderless="true"
    :error="!!errorMessage"
    :error-message="errorMessage"
  >
    <q-checkbox :label="label" v-model="value" />
  </q-field>
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "QInputWithValidation",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { errorMessage, value } = useField(props.name, undefined, {
      type: "checkbox",
      uncheckedValue: false,
      valueProp: true, // the checkbox "checked" value
    });

    return {
      errorMessage,
      value,
    };
  },
};
</script>
