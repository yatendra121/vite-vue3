<template>
  <q-input
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage"
  />
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
  },
  setup(props) {
    const { errorMessage, value } = useField(props.name);

    return {
      errorMessage,
      value,
    };
  },
};
</script>
