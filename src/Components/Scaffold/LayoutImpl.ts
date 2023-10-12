import type { Options } from "sortablejs";
import Sortable from "sortablejs";
import { RefObject } from "react";

/**
 * @description default options for sortablejs
 */
const SortableOption__default: Options = {
    animation: 200,
}

/**
 * @description layout controller implement
 */
class LayoutImpl {
    /**
     * @description 布局实例
     */
    readonly #instance: Sortable

    constructor(
        container: RefObject<HTMLDivElement>,
        sortableOptions?: Options
    ) {
        const _container = container.current

        if(!sortableOptions?.onEnd) console.warn('[Scaffold] 检测到未添加 onEnd 方法, 请确保此事件不被需要!')

        if(!_container) throw new Error('[Scaffold] 容器元素不存在!')
        this.#instance = Sortable.create(_container, {
            ...SortableOption__default,
            ...sortableOptions
        })
    }

    /**
     * @description 获取当前布局的 `fabKey/componentId` 顺序信息
     * @see load
     */
    getComponentIdsInOrder(): string[] {
        return this.#instance.toArray()
    }

    /**
     * @description 载入指定顺序
     * @see getComponentIdsInOrder
     */
    load(idInOrder: string[]) {
        this.#instance.sort(idInOrder)
    }

    /**
     * @description 销毁
     */
    dispose() {
        this.#instance.destroy()
    }
}

export {
    LayoutImpl
}
