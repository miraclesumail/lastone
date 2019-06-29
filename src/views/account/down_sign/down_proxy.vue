<template>
    <div class="d_down_member_proxy">
        <form class="r_box_form">
            <div class="form_item">
                <div class="form_item_in">
                    <label>账户</label>
                    <input type="text" placeholder="请输入4-11位字母数字">
                </div>
                <p class="meg_error"></p>
            </div>

            <div class="form_item">
                <div class="form_item_in">
                    <label>密码</label>
                    <input type="text" placeholder="请输入6-16位字母数字">
                </div>
                <p class="meg_error"></p>
            </div>

            <div class="form_item">
                <div class="form_item_in">
                    <label>确认密码</label>
                    <input type="text" placeholder="请输入6-16位字母数字">
                </div>
                <p class="meg_error"></p>
            </div>

        </form>
        <div class="update_btn"></div>

    </div>
</template>

<script>
    export default {
        name: "down_member"
    }
</script>