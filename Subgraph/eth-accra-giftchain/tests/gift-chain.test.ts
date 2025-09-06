import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { GiftClaimed } from "../generated/schema"
import { GiftClaimed as GiftClaimedEvent } from "../generated/GiftChain/GiftChain"
import { handleGiftClaimed } from "../src/gift-chain"
import { createGiftClaimedEvent } from "./gift-chain-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let giftID = Bytes.fromI32(1234567890)
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let status = "Example string value"
    let newGiftClaimedEvent = createGiftClaimedEvent(
      giftID,
      recipient,
      amount,
      status
    )
    handleGiftClaimed(newGiftClaimedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("GiftClaimed created and stored", () => {
    assert.entityCount("GiftClaimed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GiftClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "giftID",
      "1234567890"
    )
    assert.fieldEquals(
      "GiftClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GiftClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "GiftClaimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "status",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
