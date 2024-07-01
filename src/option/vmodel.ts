import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optionNullableMemberDecorator, reflectMetadataIsSupported } from '../utils'
import { decorator as PropsDecorator, type PropsConfig } from './props'

export type VModelConfig = PropsConfig & {
    name?: string
}

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, option?: VModelConfig) {
    option ??= {}
    const slot = obtainSlot(proto)
    let vmodelName = 'modelValue'

    // code from https://github.com/kaorun343/vue-property-decorator/blob/master/src/helpers/metadata.ts
    // to generate "type" option from metadata
    if (reflectMetadataIsSupported) {
        option ??= {};
        if (
            !Array.isArray(option) &&
            typeof option !== 'function' &&
            !option.hasOwnProperty('type') &&
            typeof option.type === 'undefined'
        ) {
            const type = Reflect.getMetadata('design:type', proto, name)
            if (type !== Object) {
                option.type = type
            }
        }
    }

    const propsConfig = { ...option }
    if (propsConfig) {
        vmodelName = propsConfig.name ?? vmodelName
        delete propsConfig.name
    }
    PropsDecorator(propsConfig)(proto, vmodelName)
    const map = slot.obtainMap('v-model')
    map.set(name, option)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.getMap('v-model')
    if (!names || names.size === 0) {
        return
    }
    const emits = slot.obtainMap('emits')

    names.forEach((value, name) => {
        const vmodelName = (value && value.name) ?? 'modelValue'
        const eventName = `update:${vmodelName}`
        optionBuilder.computed![name] = {
            get: function (this: any) {
                return this[vmodelName]
            },
            set: function (val: any) {
                this.$emit(eventName, val)
            }
        }
        emits.set(eventName, true)
    })

}
