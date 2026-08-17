using System;
using ForwardTest.Gameplay;
using NUnit.Framework;

namespace ForwardTest.Gameplay.Tests
{
    public sealed class PlayerDashTests
    {
        [Test]
        public void TryDash_WhenReadyAndStaminaIsAvailable_SpendsExactCostAndSucceeds()
        {
            var stamina = new RecordingStamina(50f);
            var dash = new PlayerDash(stamina);

            var succeeded = dash.TryDash(10f);

            Assert.That(succeeded, Is.True);
            Assert.That(stamina.Current, Is.EqualTo(25f));
            Assert.That(stamina.SpendAttempts, Is.EqualTo(1));
            Assert.That(stamina.LastRequestedAmount, Is.EqualTo(25f));
        }

        [Test]
        public void TryDash_DuringCooldown_RejectsWithoutTouchingStamina()
        {
            var stamina = new RecordingStamina(75f);
            var dash = new PlayerDash(stamina);
            Assert.That(dash.TryDash(10f), Is.True);

            var succeeded = dash.TryDash(10.749f);

            Assert.That(succeeded, Is.False);
            Assert.That(stamina.Current, Is.EqualTo(50f));
            Assert.That(stamina.SpendAttempts, Is.EqualTo(1));
        }

        [Test]
        public void TryDash_WhenStaminaIsInsufficient_LeavesCooldownReadyForRetry()
        {
            var stamina = new RecordingStamina(24f);
            var dash = new PlayerDash(stamina);

            Assert.That(dash.TryDash(5f), Is.False);
            Assert.That(stamina.Current, Is.EqualTo(24f));

            stamina.SetCurrent(25f);

            Assert.That(dash.TryDash(5f), Is.True);
            Assert.That(stamina.Current, Is.Zero);
            Assert.That(stamina.SpendAttempts, Is.EqualTo(2));
        }

        [Test]
        public void TryDash_WithExactlyTheCost_SucceedsWithoutClamping()
        {
            var stamina = new RecordingStamina(25f);
            var dash = new PlayerDash(stamina);

            var succeeded = dash.TryDash(0f);

            Assert.That(succeeded, Is.True);
            Assert.That(stamina.Current, Is.Zero);
            Assert.That(stamina.LastRequestedAmount, Is.EqualTo(25f));
        }

        [Test]
        public void TryDash_AtExactCooldownBoundary_IsEligible()
        {
            var stamina = new RecordingStamina(50f);
            var dash = new PlayerDash(stamina);
            Assert.That(dash.TryDash(2f), Is.True);

            var succeeded = dash.TryDash(2.75f);

            Assert.That(succeeded, Is.True);
            Assert.That(stamina.Current, Is.Zero);
            Assert.That(stamina.SpendAttempts, Is.EqualTo(2));
        }

        [Test]
        public void Constructor_WithoutStaminaOwner_Throws()
        {
            Assert.That(
                () => new PlayerDash(null),
                Throws.TypeOf<ArgumentNullException>().With.Property("ParamName").EqualTo("stamina"));
        }

        private sealed class RecordingStamina : IStamina
        {
            public RecordingStamina(float current)
            {
                Current = current;
            }

            public float Current { get; private set; }

            public int SpendAttempts { get; private set; }

            public float LastRequestedAmount { get; private set; }

            public bool TrySpend(float amount)
            {
                SpendAttempts++;
                LastRequestedAmount = amount;

                if (Current < amount)
                {
                    return false;
                }

                Current -= amount;
                return true;
            }

            public void SetCurrent(float current)
            {
                Current = current;
            }
        }
    }
}
