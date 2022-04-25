/**
 * 用于获取vuex中的数据
 */
import { mapState, useStore, createNamespacedHelpers, mapMutations, mapActions } from 'vuex'
import { computed } from 'vue'

// 注册转换
function useMap(mapper, moduleName="", mapType="mapState") {
  const MAP = {
    mapState,
    mapMutations,
    mapActions
  }
  const store = useStore()
  let map = MAP[mapType]
  const storeState = {}
  // 如果传入了module
  moduleName && (map = createNamespacedHelpers(moduleName)[mapType])

  // 获取mapState对象
  const statesObj = map(mapper)
  
  // 2. 遍历对象keys
  Object.keys(statesObj).forEach(item => {
    const fn = statesObj[item].bind({$store: store})
    if(mapType === "mapMutations" || mapType === "mapActions") {
      storeState[item] = fn
    }else {
      storeState[item] = computed(fn) 
    }
  })
  // console.log(storeState);
  return storeState
}

// 获取state
export function useMapStates(states, moduleName="") {
  return useMap(states, moduleName, "mapState")
}

export function useMapMutations(mutations, moduleName="") {
  return useMap(mutations, moduleName, "mapMutations")
}


export function useMapActions(mutations, moduleName="") {
  return useMap(mutations, moduleName, "mapActions")
}