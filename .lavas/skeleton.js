import Vue from 'vue';

import Skeleton from '/Volumes/myMac/workspace/lavas-network/core/Skeleton.vue';


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
