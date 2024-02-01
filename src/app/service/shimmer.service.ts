import { Injectable } from "@angular/core"

@Injectable({providedIn:'root'})
export class ShimmerService{
    private shimmerAnimation : Set<string> = new Set()

    constructor(){}

    generateShimmerAnimationId():string{
        const animationId = `shimmer-${Math.random().toString(36).substring(2,9)}`
        this.shimmerAnimation.add(animationId)
        return animationId
    }

    removeShimmerAnimation(animationId:string):void{
        this.shimmerAnimation. delete(animationId)
    }

    isShimmerAnimationRunning(animationId:string):boolean{
        return this.shimmerAnimation.has(animationId)
    }
}