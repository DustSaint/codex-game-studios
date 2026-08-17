using System;

namespace ForwardTest.Gameplay
{
    public sealed class PlayerDash
    {
        private const float CooldownSeconds = 0.75f;
        private const float StaminaCost = 25f;

        private readonly IStamina stamina;
        private float nextAllowedTime;

        public PlayerDash(IStamina stamina)
        {
            if (stamina == null)
            {
                throw new ArgumentNullException("stamina");
            }

            this.stamina = stamina;
        }

        public bool TryDash(float currentTime)
        {
            if (currentTime < nextAllowedTime)
            {
                return false;
            }

            // Only a successful atomic spend commits cooldown; either rejection leaves both owners unchanged.
            if (!stamina.TrySpend(StaminaCost))
            {
                return false;
            }

            nextAllowedTime = currentTime + CooldownSeconds;
            return true;
        }
    }
}
