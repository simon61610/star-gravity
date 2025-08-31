import { defineStore } from 'pinia'

export const useSearchStore = defineStore("search",{
    state: ()=>({
    keyword:'' // 共用搜尋關鍵字
}),

    actions:()=>({
        setkeyword(kw){
            this.keyword = kw; // 提供一個方法來改 keyword
        }
    })
}

)