<template>
    <a-form :layout="'vertical'" ref="formRef" :model="modelRef">
        <a-row :gutter="24">
            <a-col :span="24" v-if="actionType === 'command'">
                <a-form-item
                    name="messageType"
                    label="指令类型"
                    :rules="{
                        required: true,
                        message: '请选择指令类型',
                    }"
                >
                    <MSelect
                        v-model:value="modelRef.messageType"
                        :options="_options"
                        @change="onTypeChange"
                        type="messageType"
                    />
                </a-form-item>
            </a-col>
            <a-col
                class="inputs"
                :span="
                    modelRef.messageType === 'READ_PROPERTY' ||
                    actionType === 'latestData'
                        ? 24
                        : 12
                "
                v-if="
                    (actionType === 'command' &&
                        ['READ_PROPERTY', 'WRITE_PROPERTY'].includes(
                            modelRef.messageType,
                        )) ||
                    actionType === 'latestData'
                "
            >
                <a-form-item
                    :name="['message', 'properties']"
                    label="属性"
                    :rules="{
                        required: true,
                        message: '请选择属性',
                    }"
                >
                    <a-select
                        placeholder="请选择属性"
                        v-model:value="modelRef.message.properties"
                        show-search
                        @change="(val) => onPropertyChange(val, false)"
                    >
                        <a-select-option
                            v-for="i in metadata?.properties || []"
                            :key="i.id"
                            :value="i.id"
                            :label="i.name"
                            >{{ i.name }}</a-select-option
                        >
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col
                :span="12"
                class="inputs"
                v-if="
                    modelRef.messageType === 'WRITE_PROPERTY' &&
                    actionType === 'command'
                "
            >
                <a-form-item
                    :name="['message', 'value']"
                    label="值"
                    :rules="{
                        required: true,
                        message: '请输入值',
                    }"
                >
                    <ValueItem
                        v-model:modelValue="modelRef.message.value"
                        :itemType="
                            property.valueType?.type || property.type || 'int'
                        "
                        :placeholder="
                            property.valueType?.type === 'array'
                                ? '多个数据用英文,分割'
                                : ''
                        "
                        :options="
                            property.valueType?.type === 'enum'
                                ? (property?.valueType?.elements || []).map(
                                      (item) => {
                                          return {
                                              label: item?.text,
                                              value: item?.value,
                                          };
                                      },
                                  )
                                : property.valueType?.type === 'boolean'
                                ? [
                                      {
                                          label: property.valueType?.trueText,
                                          value: property.valueType?.trueValue,
                                      },
                                      {
                                          label: property.valueType?.falseText,
                                          value: property.valueType?.falseValue,
                                      },
                                  ]
                                : undefined
                        "
                    />
                </a-form-item>
            </a-col>
            <a-col
                :span="24"
                v-if="modelRef.messageType === 'INVOKE_FUNCTION'"
                class="inputs"
            >
                <a-form-item
                    :name="['message', 'functionId']"
                    label="功能"
                    :rules="{
                        required: true,
                        message: '请选择功能',
                    }"
                >
                    <a-select
                        placeholder="请选择功能"
                        v-model:value="modelRef.message.functionId"
                        show-search
                        @change="(e) => funcChange(e)"
                    >
                        <a-select-option
                            v-for="i in metadata?.functions || []"
                            :key="i.id"
                            :value="i.id"
                            :label="i.name"
                            >{{ i.name }}</a-select-option
                        >
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col
                :span="24"
                v-if="
                    modelRef.messageType === 'INVOKE_FUNCTION' &&
                    modelRef.message?.functionId &&
                    modelRef.message?.inputs?.length
                "
                class="inputs"
            >
                <a-form-item
                    :name="['message', 'inputs']"
                    label="参数列表"
                    :rules="{
                        required: true,
                        message: '请输入参数列表',
                    }"
                >
                    <EditTable
                        ref="editRef"
                        v-model="modelRef.message.inputs"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script lang="ts" setup>
import EditTable from './EditTable.vue';
import MSelect from '../../../components/MSelect/index.vue';

const formRef = ref();

const props = defineProps({
    actionType: {
        type: String,
        default: '',
    },
    modelValue: {
        type: Object,
        default: () => {},
    },
    metadata: {
        type: Object,
        default: () => {
            return {
                properties: [],
                functions: [],
            };
        },
    },
});

const emit = defineEmits(['update:modelValue']);

const editRef = ref();

const modelRef = reactive({
    messageType: 'READ_PROPERTY',
    message: {
        properties: undefined,
        functionId: undefined,
        inputs: [],
        value: undefined,
    },
});

const property = ref<any>({});

const onPropertyChange = (val: string, flag?: boolean) => {
    if (val) {
        const _item = props.metadata?.properties.find(
            (item: any) => item.id === val,
        );
        property.value = _item || {};
    }
    if (!flag) {
        modelRef.message.value = undefined;
    }
};

const _options = [
    {
        id: 'READ_PROPERTY',
        name: '读取属性',
    },
    {
        id: 'WRITE_PROPERTY',
        name: '修改属性',
    },
    {
        id: 'INVOKE_FUNCTION',
        name: '调用功能',
    },
];
const onTypeChange = () => {
    // 需要记住之前的选择, 所以注释了该代码
    // modelRef.message = {
    //     properties: undefined,
    //     functionId: undefined,
    //     inputs: [],
    //     value: undefined,
    // };
};

const funcChange = (val: string, _inputs?: any[]) => {
    if (val) {
        const arr =
            props.metadata?.functions.find((item: any) => item.id === val)
                ?.inputs || [];
        const list = arr.map((item: any) => {
            const _item = _inputs?.find((i) => i.id === item.id);
            return {
                id: item.id,
                name: item.name,
                value: undefined,
                valueType: item?.valueType?.type,
                ..._item,
                required: item?.expands?.required,
            };
        });
        modelRef.message.inputs = list;
    }
};

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) {
            Object.assign(modelRef, newVal);
            if (newVal?.message?.properties) {
                onPropertyChange(newVal?.message?.properties, true);
            }
            if (newVal?.message?.functionId) {
                funcChange(
                    newVal?.message?.functionId,
                    newVal?.message?.inputs,
                );
            }
        }
    },
    {
        immediate: true,
    },
);

const saveBtn = () =>
    new Promise((resolve) => {
        formRef.value
            .validate()
            .then(async (_data: any) => {
                if (modelRef.message.inputs?.length) {
                    await editRef.value?.onSave().catch(() => {
                        resolve(false);
                    });
                }
                emit('update:modelValue', _data);
                resolve(_data);
            })
            .catch((err: any) => {
                resolve(err);
            });
    });

defineExpose({ saveBtn });
</script>

<style lang="less" scoped>
.inputs {
    .ant-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>