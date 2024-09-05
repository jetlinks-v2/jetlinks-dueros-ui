import { request } from '@jetlinks-web/core'

/**
 * 根据条件查询产品（不带翻页）
 * @param data 查询条件
 * @returns
 */
export const queryNoPagingPost = (data: any) => request.post(`/device-product/_query/no-paging?paging=false`, data)


 /**
 * 启用产品
 * @param productId 产品ID
 * @param data
 * @returns
 */
 export const _deploy = (productId: string) => request.post(`/device-product/${productId}/deploy`)