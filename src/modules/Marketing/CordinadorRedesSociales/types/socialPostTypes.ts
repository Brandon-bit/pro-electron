// Estructura para medios (imágenes/videos)
export interface PostMedia {
  mediaUrl: string;
  sortOrder: number;
  idUsuario: string;
  idCuenta: string;
}

// Estructura para plataformas
export interface PostPlatform {
  platformName: string;
  idUsuario?: string; // @deprecated - El backend obtiene el ID desde los claims del token
  idCuenta?: string; // @deprecated - El backend obtiene el ID desde los claims del token
  platformSpecificData?: PlatformSpecificData;
}

// Datos específicos de cada plataforma
export interface PlatformSpecificData {
  // Facebook
  facebookPostType?: 'regular' | 'reel' | 'story';
  
  // Instagram
  instagramPostType?: 'feed' | 'reel' | 'story';
  instagramReelShareToFeed?: boolean;
  
  // TikTok
  tikTokPrivacyLevel?: 'public' | 'friends' | 'private';
  tikTokCommentDisabled?: boolean;
  tikTokDuetDisabled?: boolean;
  tikTokStitchDisabled?: boolean;
  tikTokBrandContentToggle?: boolean;
  tikTokBrandOrganicToggle?: boolean;
  
  // YouTube
  youTubeTitle?: string;
  youTubeVisibility?: 'public' | 'private' | 'unlisted';
  youTubeShorts?: boolean;
  
  // LinkedIn
  linkedInVisibility?: 'public' | 'connections';
  
  // Twitter/X
  twitterQuoteTweetId?: string;
  twitterReplyToTweetId?: string;
  
  // Telegram
  telegramSilentNotification?: boolean;
  telegramParseMode?: 'Markdown' | 'HTML';
  
  // Reddit
  redditSubreddit?: string;
  redditFlairId?: string;
  redditFlairText?: string;
  
  // Google Business
  googleTopicType?: 'standard' | 'event' | 'offer';
  googleActionType?: 'book' | 'order' | 'shop' | 'learn_more' | 'sign_up' | 'call';
  googleCallToActionUrl?: string;
  googleEventTitle?: string;
  googleEventStartDate?: string;
  googleEventEndDate?: string;
  googleOfferCouponCode?: string;
  googleOfferRedeemOnlineUrl?: string;
  googleOfferTermsConditions?: string;
}

export interface SocialPost {
  id: number;
  idMarca: number;
  idCampania: number | null;
  postContent: string;
  scheduleDate: string | null;
  shortenLinks: boolean | null;
  status: string | null;
  ayrsharePostId: string | null;
  idUsuario: string | null;
  fechaCreacion: string;
  fechaActualizacion: string | null;
  activo: boolean | null;
  eliminado: boolean | null;
  idCuenta: string;
  mktPostMedias?: PostMedia[];
  mktPostPlatforms?: PostPlatform[];
  
  // Campos de compatibilidad para el template actual
  date?: string;
  networks?: {
    facebook?: boolean;
    instagram?: boolean;
    twitter?: boolean;
    tiktok?: boolean;
    youtube?: boolean;
    linkedin?: boolean;
    telegram?: boolean;
    reddit?: boolean;
    gmb?: boolean; // Google My Business
  };
  image?: string;
  caption?: string;
}

// Tipo para el formulario
export interface SocialPostFormType {
  // Campos básicos
  postContent: string;
  scheduleDate: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  shortenLinks: boolean;
  
  // Redes sociales seleccionadas
  selectedPlatforms: string[];
  
  // Archivos multimedia
  mediaFiles: File[];
  mediaUrls?: string[]; // Para edición
  
  // Datos específicos por plataforma
  platformData: {
    [platform: string]: PlatformSpecificData;
  };
}

// Request que se envía al backend
export interface SocialPostRequest {
  idMarca: number;
  idCampania?: number;
  postContent: string;
  scheduleDate?: string;
  shortenLinks: boolean;
  status: string;
  idUsuario: string;
  idCuenta: string;
  mktPostPlatforms: PostPlatform[];
  mktPostMedias: PostMedia[];
}