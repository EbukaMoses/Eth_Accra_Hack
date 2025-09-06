import {
  GiftClaimed as GiftClaimedEvent,
  GiftCreated as GiftCreatedEvent,
  GiftReclaimed as GiftReclaimedEvent
} from "../generated/GiftChain/GiftChain"
import { GiftClaimed, GiftCreated, GiftReclaimed } from "../generated/schema"

export function handleGiftClaimed(event: GiftClaimedEvent): void {
  let entity = new GiftClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.giftID = event.params.giftID
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGiftCreated(event: GiftCreatedEvent): void {
  let entity = new GiftCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.giftID = event.params.giftID
  entity.creator = event.params.creator
  entity.token = event.params.token
  entity.message = event.params.message
  entity.amount = event.params.amount
  entity.expiry = event.params.expiry
  entity.timeCreated = event.params.timeCreated
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGiftReclaimed(event: GiftReclaimedEvent): void {
  let entity = new GiftReclaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.giftID = event.params.giftID
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
