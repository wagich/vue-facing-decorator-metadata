import debounce from 'debounce';
import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, } from '../utils'
import type { WatchCallback } from 'vue'
import { compatibleMemberDecorator } from '../deco3/utils'
export interface WatchConfig {
    key: string
    handler: WatchCallback,
    flush?: 'post',
    deep?: boolean,
    immediate?: boolean,
}
type Option = Omit<WatchConfig, 'handler' | 'key'> & { debounce?: number, debounceImmediate?: boolean }
export function decorator(key: string, option?: Option) {
    return compatibleMemberDecorator(function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        const map = slot.obtainMap('watch');
        let handler = proto[name];
        if (option?.debounce != null && option.debounce > 0) {
            handler = debounce(handler, option.debounce, { immediate: option.debounceImmediate ?? false });
        }
        const opt = Object.assign({}, option ?? {}, {
            key: key,
            handler: handler
        })
        if (map.has(name)) {
            const t = map.get(name)!
            if (Array.isArray(t)) {
                t.push(opt)
            } else {
                map.set(name, [t, opt])
            }
        }
        else {
            map.set(name, opt)
        }
    })
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.watch ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.getMap('watch')
    if (!names || names.size === 0) {
        return
    }

    names.forEach((value, _name) => {
        const values = Array.isArray(value) ? value : [value]
        values.forEach(v => {
            if (!optionBuilder.watch![v.key]) {
                optionBuilder.watch![v.key] = v
            } else {
                const t = optionBuilder.watch![v.key]
                if (Array.isArray(t)) {
                    t.push(v)
                } else {
                    optionBuilder.watch![v.key] = [t, v]
                }
            }
        })
    })


}
