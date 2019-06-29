<template>
    <div class="d_update_password">
        <Header :showCbBtn="true">修改银行卡资料</Header>

        <div class="input_box">
            <form class="r_box_form">
                <div class="form_item">
                    <div class="form_item_in">
                        <label>收款人</label>
                        <input type="text" placeholder="请输入收款人">
                    </div>
                    <p class="meg_error"></p>
                </div>
                <!--            <div class="show_item" v-show="true" style="margin-bottom: 0.4rem;">-->
                <!--                <div class="show_item_in">-->
                <!--                    <label>姓名</label>-->
                <!--                    <div class="show_content"></div>-->
                <!--                    <div class="show_item_btn"></div>-->
                <!--                </div>-->
                <!--            </div>-->
                <div class="form_item">
                    <div class="form_item_in select">
                        <label>银行名称</label>
                        <select name="" id=""></select>
                    </div>
                </div>
                <div class="form_item">
                    <div class="form_item_in">
                        <label>银行账号</label>
                        <input type="text" placeholder="请输入银行账号" >
                    </div>
                    <p class="meg_error"></p>
                </div>
                <div class="box_form_item">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in select">
                                <label>开户城市</label>
                                <select name="" id=""></select>
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <div class="form_item">
                            <div class="form_item_in select">
                                <select name="" id=""></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form_item">
                    <div class="form_item_in">
                        <label>开户网点</label>
                        <input type="text" placeholder="请输入开户网点">
                    </div>
                    <p class="meg_error"></p>
                </div>
                <div class="box_form_item sms_code">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in">
                                <label>图形验证</label>
                                <input type="text" maxlength="4" placeholder="输入验证码">
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <div class="item_right">
                            <div class="captcha">
                                <img src="" alt="">
                            </div>
                        </div>
                    </div>
                    <p class="meg_error"></p>
                </div>
                <div class="box_form_item sms_code">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in">
                                <label>短信验证</label>
                                <input type="text" maxlength="4" placeholder="输入验证码">
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <div class="get_code_btn"></div>
                    </div>
                    <p class="meg_error" style="margin-top:0.1rem;"></p>
                </div>
            </form>
            <div class="sure_btn"></div>
            <p class="bottom_text">收不到短信验证码?</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "update_bank"
    }
</script>