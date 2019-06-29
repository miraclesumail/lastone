<template>
    <div class="d_update_password">
        <Header :showCbBtn="true">修改电话</Header>

        <div class="input_box">

            <form class="r_box_form">
                <div class="form_item">
                    <div class="form_item_in">
                        <label>旧手机号</label>
                        <input type="text" placeholder="请输入您的旧手机号">
                    </div>
                    <p class="meg_error"></p>
                </div>

                <div class="form_item">
                    <div class="form_item_in">
                        <label>新手机号</label>
                        <input type="text" placeholder="请输入您的新手机号">
                    </div>
                    <p class="meg_error"></p>
                </div>

                <div class="box_form_item sms_code">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in">
                                <label>短信验证</label>
                                <input maxlength="4" type="text" placeholder="输入验证码">
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <div class="get_code_btn">{{getSmsBtnText}}</div>
                    </div>
                    <p class="meg_error"></p>
                </div>

            </form>

            <div class="update_btn"></div>
            <p>收到不到短信验证码？</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "update_password",
        data() {
            return {
                getSmsBtnText: 'nihao'
            }
        },
    }
</script>