<script>
export default {
    name: "Slider",
    props: {
        text: String,
        checked: String
    },
    methods: {
        isChecked() {
            return this.$refs["data"].checked;
        }
    },
    mounted() {
        if(this.checked == 1) {
            this.$refs["data"].setAttribute("checked", true);
        }
    }
}
</script>
<template>
    <div class="form-check form-switch">
        <input ref="data" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
        <label class="form-check-label" for="flexSwitchCheckChecked">{{this.text}}</label>
    </div>
</template>