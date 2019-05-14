import Vue from 'vue';

import Skeleton from '/Volumes/myMac/workspace/network-lavas/core/Skeleton.vue';


export default new Vue({
    components: {
        
        Skeleton,
        
    },
    template: `
        <div>
            
            <skeleton id="skeleton" style="display:none"/>
            
        </div>
    `
});
