<template>
    <div class="doc">
        <div class="url">
            小度智能家居开放平台：
            <a
                href="https://dueros.baidu.com/dbp/bot/index#/iotopenplatform"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://dueros.baidu.com/dbp/bot/index#/iotopenplatform
            </a>
        </div>
        <h1>1. 概述</h1>
        <div>
            DuerOS支持在家居场景下进行云端控制，该页面主要将平台的产品与DuerOS支持语音控制的产品进行映射，达到小度平台控制本平台设备的目的。
        </div>
        <h1>2. 操作步骤</h1>
        <div>
            <div>1、在百度小度技能平台创建技能，并授权。</div>
            <div>
                2、在物联网平台 系统管理--应用管理中配置应用完成与DuerOS的关联。
            </div>
            <div class="image">
                <a-image
                    width="100%"
                    :src="doc"
                />
                <div class="desc">新建DuerOS</div>
            </div>
            <a-descriptions
                bordered
                size="small"
                :column="1"
                :labelStyle="{ width: '100px' }"
            >
                <a-descriptions-item label="参数">说明</a-descriptions-item>
                <a-descriptions-item label="授权地址"
                    >物联网平台的登录地址http://host:port/JetLinks.cn</a-descriptions-item
                >
                <a-descriptions-item label="Client_Id">
                    请复制并填写物联网平台的appId
                </a-descriptions-item>
                <a-descriptions-item label="Scope">
                    以空格分割的权限列表，若不传递此参数，代表请求用户的默认权限
                </a-descriptions-item>
                <a-descriptions-item label="Token地址">
                    请复制并填写：HTTPS://host:port/api/v1/token
                </a-descriptions-item>
                <a-descriptions-item label="ClientSecret">
                    请复制并填写物联网平台的secureKey
                </a-descriptions-item>
                <a-descriptions-item label="WebService">
                    请复制并填写：/dueros/product/_query
                </a-descriptions-item>
            </a-descriptions>
            <div class="image">
                <a-image
                    width="100%"
                    :src="doc1"
                />
                <div class="desc">新建应用</div>
            </div>
            <a-descriptions
                bordered
                size="small"
                :column="1"
                :labelStyle="{ width: '100px' }"
            >
                <a-descriptions-item label="参数">说明</a-descriptions-item>
                <a-descriptions-item label="appId">
                    第三方应用唯一标识，物联网平台的自动生成
                </a-descriptions-item>
                <a-descriptions-item label="secureKey">
                    secureKey 第三方应用唯一标识匹配的秘钥，物联网平台的自动生成
                </a-descriptions-item>
                <a-descriptions-item label="角色">
                    为应用用户分配角色，根据绑定的角色，进行系统菜单赋权
                </a-descriptions-item>
                <a-descriptions-item label="组织">
                    为应用用户分配所属组织，根据绑定的组织，进行数据隔离
                </a-descriptions-item>
                <a-descriptions-item label="redirectUrl">
                    请复制并填写小度平台的回调地址
                </a-descriptions-item>
                <a-descriptions-item label="IP白名单">
                    允许指定IP地址访问
                </a-descriptions-item>
            </a-descriptions>
            <div>3、登录物联网平台，进行平台内产品与DuerOS产品的数据映射。</div>
            <div>
                4、智能家居用户通过物联网平台中的用户，登录小度APP，获取平台内当前用户的所属设备。获取后即可进行语音控制。
            </div>
        </div>
        <h1>配置说明</h1>
        <div>
            “设备类型”为DuerOS平台拟定的标准规范，设备类型将决定【动作映射】中“动作”的下拉选项，以及【属性映射】中“Dueros属性”的下拉选项
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { getImage } from '@/utils/comm';
import doc from '../../../../assets/images/dueros-doc.jpg'
import doc1 from '../../../../assets/images/dueros-doc1.png'

</script>

<style lang="less" scoped>
.doc {
    height: 100%;
    padding: 24px;
    overflow-y: auto;
    color: rgba(#000, 0.8);
    font-size: 14px;
    background-color: #fafafa;
    &::-webkit-scrollbar {
        width: 5px; /* 滚动条宽度 */
        background-color: #edf5ff; /* 滚动条背景色 */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #d0d0d0; /* 滚动条拖动部分颜色 */
        border-radius: 4px; /* 滚动条拖动部分圆角 */
    }
    .url {
        padding: 8px 16px;
        color: #2f54eb;
        background-color: rgba(#a7bdf7, 0.2);
        word-wrap: break-word;
    }

    h1 {
        margin: 16px 0;
        color: rgba(#000, 0.85);
        font-weight: bold;
        font-size: 14px;

        &:first-child {
            margin-top: 0;
        }
    }

    h2 {
        margin: 6px 0;
        color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
    }

    .image {
        margin: 16px 0;

        .desc {
            width: 100%;
            text-align: center;
            color: rgb(138, 143, 141);
            margin-top: 10px;
        }
    }
}
</style>
