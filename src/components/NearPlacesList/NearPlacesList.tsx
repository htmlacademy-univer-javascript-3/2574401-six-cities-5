import { Offer } from '@components/OfferCard/OfferCard';
import NearPlaceCard from '@components/NearPlaceCard/NearPlaceCard';

interface NearPlacesListProps {
  offers: Offer[];
  onOfferHover?: (offer: Offer | null) => void;
}

/**
 * Компонент списка ближайших предложений
 */
const NearPlacesList = ({ offers, onOfferHover }: NearPlacesListProps) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <NearPlaceCard
        key={offer.id}
        offer={offer}
        onCardHover={onOfferHover}
      />
    ))}
  </div>
);

export default NearPlacesList;
