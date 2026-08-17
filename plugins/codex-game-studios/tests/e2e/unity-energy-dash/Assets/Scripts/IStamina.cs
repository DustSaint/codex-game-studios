namespace ForwardTest.Gameplay
{
    public interface IStamina
    {
        float Current { get; }

        /// <summary>
        /// Spends the exact requested amount when available. A false result must leave
        /// the stamina value unchanged so callers can safely treat this as an atomic operation.
        /// </summary>
        bool TrySpend(float amount);
    }
}
