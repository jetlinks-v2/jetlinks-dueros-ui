export default [
    {
        code: 'iot',
        name: '物联网',
        owner: 'iot',
        id: '9c21f88182e7cc75cbdfa8e4b7844272',
        url: '/iot',
        icon: 'icon-wulianwang',
        sortIndex: 1,
        permissions: [],
        children: [
            {
                code: 'Northbound',
                name: '北向输出',
                owner: 'iot',
                //parentId: '1',
                id: 'ea3d760edbd908eb0bc901db2801e8b5',
                sortIndex: 6,
                url: '/iot/northbound',
                icon: 'icon-yunyunjieru',
                permissions: [],
                buttons: [],
                showPage: [],
                children: [
                    {
                        code: 'Northbound/DuerOS',
                        name: 'DuerOS',
                        owner: 'iot',
                        //parentId: '1-6',
                        id: '4a7c3fbac5a3a894e90d0e9e4a3e4aa5',
                        sortIndex: 1,
                        url: '/iot/northbound/DuerOS',
                        icon: 'icon-zhineng',
                        permissions: [],
                        showPage: ['dueros-product'],
                        buttons: [
                            {
                                id: 'action',
                                name: '启/禁用',
                                permissions: [
                                    {
                                        permission: 'dueros-product',
                                        actions: ['query', 'save'],
                                    },
                                ],
                            },
                            {
                                id: 'update',
                                name: '编辑',
                                permissions: [
                                    {
                                        permission: 'dueros-product',
                                        actions: ['query', 'save'],
                                    },
                                    {
                                        permission: 'device-product',
                                        actions: ['query'],
                                    },
                                ],
                            },
                            {
                                id: 'view',
                                name: '查看',
                                permissions: [
                                    {
                                        permission: 'dueros-product',
                                        actions: ['query'],
                                    },
                                    {
                                        permission: 'device-product',
                                        actions: ['query'],
                                    },
                                ],
                            },
                            {
                                id: 'delete',
                                name: '删除',
                                permissions: [
                                    {
                                        permission: 'dueros-product',
                                        actions: ['query', 'delete'],
                                    },
                                ],
                            },
                            {
                                id: 'add',
                                name: '新增',
                                permissions: [
                                    {
                                        permission: 'dueros-product',
                                        actions: ['query', 'save'],
                                    },
                                    {
                                        permission: 'device-product',
                                        actions: ['query'],
                                    },
                                ],
                            },
                        ],
                        accessSupport: { text: "支持", value: "support" },
                        supportDataAccess: true,
                        assetType: 'dueros'
                    },
                ],
            },
        ],
    },
]
