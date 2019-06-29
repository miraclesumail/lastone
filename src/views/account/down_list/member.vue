<template>
    <div class="d_mem_proxy">
        <table class="table_b nomargin">
            <tr>
                <th>账号</th>
                <th>注册时间</th>
                <th>最后登录时间</th>
                <th>操作</th>
            </tr>
            <tr>
                <td>atest01</td>
                <td>18-11-11 18:00</td>
                <td>18-11-11 18:00</td>
                <td><span class="search"></span></td>
            </tr>
        </table>

        <div class="pag_box">
            <Pagination></Pagination>
        </div>

        <div class="btn_box"></div>
    </div>
</template>

<script>
    import Pagination from  '../../../components/pagination';
    export default {
        name: "member",
        components:{
            Pagination
        }
    }
</script>